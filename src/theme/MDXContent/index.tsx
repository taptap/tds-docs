import React, { useState, useEffect, useRef } from "react";
import MDXContent from "@theme-original/MDXContent";
import type MDXContentType from "@theme/MDXContent";
import type { WrapperProps } from "@docusaurus/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import axios from "axios";

import styles from "./index.module.scss";

import IconTip from "./icons/tip.svg";
import IconEdit from "./icons/edit.svg";
import IconFeedback from "./icons/feedback.svg";
import IconClose from "./icons/close.svg";
import IconEmpty from "./icons/empty.svg";
import IconStar from "./icons/star.svg";
import IconInfo from "./icons/info.svg";
import IconSuccess from "./icons/success.svg";
import tap from "./icons/tap.png";

type Position = { top: number; left: number };

type Selection = { range: Range; text: string };

type FeedbackThread = {
  id: number;
  content: string;
  replyContent: string;
  creatorSimpleUser: {
    nickname: string;
    avatar: string;
  };
  createdTime: string;
  updatedTime: string;
};

type FeedbackContext = {
  entryType: number;
  text?: string;
  paragraphId?: string;
};

type FeedbackStatistic = {
  count: number;
  paragraphStatistics: { id: string; count: number }[];
};

const getValueFromCookie = (name: string): string | undefined =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

const getPageId = (): string => {
  let id = window.location.pathname.substring(5);
  if (!id.endsWith("/")) {
    id += "/";
  }
  return id;
};

const getRegion = (): string => {
  const INTL_DOMAINS = ["developer.taptap.io", "developer-intl.xdrnd.com"];
  return INTL_DOMAINS.includes(window.location.host) ? "intl" : "cn";
};

const getIsLoggedIn = (): boolean => {
  const userId: string | undefined = getValueFromCookie("user_id") || getValueFromCookie("ACCOUNTS_USER_ID");
  return userId !== undefined;
};

const getParagraphFromTarget = (target) => {
  while (!target.parentNode.classList.contains("theme-doc-markdown")) {
    target = target.parentNode;
  }
  return target;
};

const getTextFromParagraph = (paragraph): string => paragraph.textContent;

const getHashCodeFromString = (string: string): string => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    const charCode = string.charCodeAt(i);
    hash = (hash << 5) - hash + charCode;
    hash |= 0;
  }
  return hash.toString();
};

const getIdFromParagraph = (paragraph): string => {
  const text = getTextFromParagraph(paragraph);
  return getHashCodeFromString(text);
};

const fetchFeedbackStatistic = async (): Promise<FeedbackStatistic> => {
  const url = "/api/config/v1/feedback/statistic";
  const config = {
    headers: {
      accept: "application/json",
      region: getRegion(),
    },
    params: {
      page_id: getPageId(),
    },
  };
  const {
    data: {
      data: {
        pageStatistic: { count },
        paragraphStatistics,
      },
    },
  } = await axios.get(url, config);
  return { count, paragraphStatistics };
};

const fetchFeedbackList = async (
  paragraphId = ""
): Promise<FeedbackThread[]> => {
  const url = "/api/config/v1/feedback/list";
  const config = {
    headers: {
      accept: "application/json",
      region: getRegion(),
    },
    params: {
      page_id: getPageId(),
      paragraph_id: paragraphId,
    },
  };
  const {
    data: {
      data: { list },
    },
  } = await axios.get(url, config);
  return list;
};

const getXsrfToken = async (): Promise<string> => {
  let token: string | undefined = getValueFromCookie("DC_XSRF_TOKEN");
  if (token === undefined) {
    await fetchFeedbackCount();
    token = getValueFromCookie("DC_XSRF_TOKEN") as string;
  }
  return token;
};

const createFeedback = async (data) => {
  const url = "/api/config/v1/feedback/submit";
  const config = {
    headers: {
      accept: "application/json",
      region: getRegion(),
      "Content-Type": "application/json",
      "X-DC-XSRF-TOKEN": await getXsrfToken(),
    },
  };
  await axios.post(url, data, config);
};

interface SelectionFeedbackBtnProps {
  context: FeedbackContext | null;
  setContext: (context: FeedbackContext) => void;
}

function SelectionFeedbackBtn({
  context,
  setContext,
}: SelectionFeedbackBtnProps) {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [paragraph, setParagraph] = useState(null);

  const updateSelection = () => {
    const selection = document.getSelection();

    if (
      selection === null ||
      selection.isCollapsed ||
      selection.getRangeAt(0).getClientRects().length === 0
    ) {
      setSelection(null);
      setParagraph(null);
    } else {
      const target = selection.anchorNode;
      const paragraph = getParagraphFromTarget(target);
      setSelection({
        range: selection.getRangeAt(0),
        text: selection.toString(),
      });
      setParagraph(paragraph);
    }
  };

  const updateSelectionIfExist = () => {
    if (selection !== null) {
      updateSelection();
    }
  };

  const getBtnPositionFromRange = (range: Range): Position => {
    const clientRects = range.getClientRects();
    const lastClientRect = clientRects[clientRects.length - 1];

    return {
      top: window.scrollY + lastClientRect.y + lastClientRect.height + 10,
      left: Math.min(
        window.scrollX + lastClientRect.x + lastClientRect.width - 16,
        window.innerWidth - 96
      ),
    };
  };

  useEffect(() => {
    document.addEventListener("pointerup", updateSelection);
    document.addEventListener("selectionchange", updateSelectionIfExist);

    return () => {
      document.removeEventListener("pointerup", updateSelection);
      document.removeEventListener("selectionchange", updateSelectionIfExist);
    };
  }, [selection]);

  return selection && context === null ? (
    <button
      className={styles.selectionFeedbackBtn}
      style={getBtnPositionFromRange(selection.range)}
      onClick={() => {
        setContext({
          entryType: 1,
          text: selection.text,
          paragraphId: getIdFromParagraph(paragraph),
        });
      }}
    >
      <IconEdit className={styles.icon} />
      <span>我要反馈</span>
    </button>
  ) : (
    <></>
  );
}

interface ParagraphFeedbackBtnProps {
  feedbackStatistic: FeedbackStatistic;
  context: FeedbackContext | null;
  setContext: (context: FeedbackContext) => void;
}

function ParagraphFeedbackBtn({
  feedbackStatistic,
  context,
  setContext,
}: ParagraphFeedbackBtnProps) {
  const [paragraph, setParagraph] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const timer = useRef(null);

  const updateParagraph = (e: MouseEvent) => {
    clearTimeout(timer.current);
    if (
      !e.target.classList.contains("theme-doc-markdown") &&
      e.target.closest(".theme-doc-markdown") &&
      !e.target.closest(`.${styles.paragraphFeedbackBtn}`)
    ) {
      const target = getParagraphFromTarget(e.target);
      setParagraph(target);
    } else {
      timer.current = setTimeout(() => {
        setParagraph(null);
      }, 3000);
    }
  };

  const getBtnPositionFromParagraph = (paragraph): Position => {
    const clientRect = paragraph.getBoundingClientRect();

    return {
      top: window.scrollY + clientRect.y,
      left: window.scrollX + clientRect.x + clientRect.width + 3,
    };
  };

  const getFeedbackCount = (paragraph): number => {
    const { paragraphStatistics } = feedbackStatistic;
    const paragraphId = getIdFromParagraph(paragraph);
    const count =
      paragraphStatistics.find((stat) => stat.id === paragraphId)?.count || 0;
    return count;
  };

  const updateScrollY = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    document.addEventListener("mouseover", updateParagraph);
    document.addEventListener("scroll", updateScrollY);

    return () => {
      document.removeEventListener("mouseover", updateParagraph);
      document.removeEventListener("scroll", updateScrollY);
    };
  }, [paragraph, scrollY]);

  return paragraph && context === null ? (
    <button
      className={styles.paragraphFeedbackBtn}
      style={getBtnPositionFromParagraph(paragraph)}
      onClick={() => {
        setContext({
          entryType: 2,
          text: getTextFromParagraph(paragraph),
          paragraphId: getIdFromParagraph(paragraph),
        });
      }}
    >
      <IconTip className={styles.tip} />
      <IconEdit className={styles.icon} />
      {getFeedbackCount(paragraph) > 0 ? (
        <span>{getFeedbackCount(paragraph)}条反馈</span>
      ) : (
        <></>
      )}
    </button>
  ) : (
    <></>
  );
}

interface PageFeedbackBtnProps {
  feedbackCount: number;
  context: FeedbackContext | null;
  setContext: (context: FeedbackContext) => void;
}

function PageFeedbackBtn({
  feedbackCount,
  context,
  setContext,
}: PageFeedbackBtnProps) {
  return context === null ? (
    <button
      className={styles.pageFeedbackBtn}
      onClick={() => {
        setContext({ entryType: 3 });
      }}
    >
      <IconFeedback className={styles.icon} />
      <div className={styles.tooltip}>
        <span>文档反馈</span>
        <IconTip className={styles.tip} />
      </div>
      {feedbackCount > 0 ? (
        <span className={styles.badge}>{feedbackCount}</span>
      ) : (
        <></>
      )}
    </button>
  ) : (
    <></>
  );
}

interface FeedbackModalProps {
  isLoggedIn: boolean;
  feedbackList: FeedbackThread[];
  context: FeedbackContext;
  setContext: (context: null) => void;
  showToast: () => void;
}

function FeedbackModal({
  isLoggedIn,
  context,
  setContext,
  showToast,
}: FeedbackModalProps) {
  const TYPE_OPTIONS = [
    {
      value: 1,
      name: "疑问",
      description: "文档内容不清晰/太复杂",
    },
    {
      value: 2,
      name: "纠错",
      description: "描述内容不准确/语句不通",
    },
    {
      value: 3,
      name: "建议",
      description: "分享更多想法",
    },
  ];

  const [type, setType] = useState<number | null>(null);
  const [feedbackList, setFeedbackList] = useState<FeedbackThread[]>([]);
  const [content, setContent] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);

  const updateFeedbackList = async () => {
    const feedbackList: FeedbackThread[] = await fetchFeedbackList(
      context.paragraphId
    );
    setFeedbackList(feedbackList);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(parseInt(e.target.value));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const submitFeedback = async () => {
    setProcessing(true);
    const data = {
      pageId: getPageId(),
      paragraphId: context.paragraphId || "",
      entryType: context.entryType,
      type: type,
      docStart: (context.text || "").slice(0, 10),
      docUrl: window.location.href,
      content: content,
    };
    try {
      await createFeedback(data);
      showToast();
      setContext(null);
    } catch (error) {
      setProcessing(false);
    }
  };

  useEffect(() => {
    document.body.classList.add(styles.noScroll);
    updateFeedbackList();


    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, []);

  return (
    <div className={styles.feedbackModal}>
      <div
        className={`${styles.dialog} ${
          isLoggedIn && feedbackList.length > 0 ? styles.tall : ""
        }`}
      >
        <header>
          <h2>提交文档反馈</h2>
          <button
            className={styles.close}
            onClick={() => {
              setContext(null);
            }}
          >
            <IconClose className={styles.icon} />
          </button>
        </header>

        {feedbackList.length > 0 || isLoggedIn ? (
          <section className={styles.body}>
            <section className={styles.main}>
              {feedbackList.length > 0 ? (
                <section className={styles.loose}>
                  <h3 className={styles.subtitle}>用户反馈参考</h3>

                  <section
                    className={`${styles.threads} ${
                      isLoggedIn ? "" : styles.tall
                    }`}
                  >
                    {feedbackList.map((thread) => (
                      <div className={styles.thread} key={thread.id}>
                        <div className={styles.post}>
                          <div className={styles.meta}>
                            <img
                              src={thread.creatorSimpleUser.avatar}
                              alt={thread.creatorSimpleUser.nickname}
                            />
                            <span>{thread.creatorSimpleUser.nickname}</span>
                            <span>|</span>
                            <span className={styles.muted}>
                              {new Date(thread.createdTime).toLocaleString(
                                "zh-CN"
                              )}
                            </span>
                          </div>
                          <p>{thread.content}</p>
                        </div>

                        {thread.replyContent !== "" ? (
                          <div className={styles.post}>
                            <div className={styles.meta}>
                              <img src={tap} alt="TapTap" />
                              <span>官方回复</span>
                              <span>|</span>
                              <span className={styles.muted}>
                                {new Date(thread.updatedTime).toLocaleString(
                                  "zh-CN"
                                )}
                              </span>
                            </div>
                            <p>{thread.replyContent}</p>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                  </section>
                </section>
              ) : (
                <></>
              )}

              {isLoggedIn ? (
                <>
                  <section className={styles.loose}>
                    <span className={styles.subtitle}>
                      <IconStar className={styles.icon} />
                      {context.entryType === 1
                        ? "您对所选内容反馈的类型是："
                        : "您反馈的类型是："}
                    </span>

                    <div className={styles.options}>
                      {TYPE_OPTIONS.map((option) => (
                        <label className={styles.option} key={option.value}>
                          <input
                            type="radio"
                            name="type"
                            value={option.value}
                            checked={type === option.value}
                            onChange={handleTypeChange}
                          />
                          <span>
                            <span className={styles.name}>{option.name}</span> -{" "}
                            {option.description}
                          </span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <section className={styles.content}>
                    <label className={styles.tight}>
                      <span className={styles.subtitle}>
                        <IconStar className={styles.icon} />
                        问题描述：
                      </span>
                      <textarea
                        placeholder="请输入具体的问题描述"
                        value={content}
                        onChange={handleContentChange}
                        maxLength={200}
                      />
                    </label>
                    <span className={styles.count}>{content.length} / 200</span>
                  </section>
                </>
              ) : (
                <></>
              )}
            </section>

            <footer>
              <span className={styles.info}>
                <IconInfo className={styles.icon} />
                {isLoggedIn ? (
                  <span>
                    如有复杂问题，建议使用{" "}
                    <a href="/user-center/create-ticket" target="_blank">
                      工单
                    </a>{" "}
                    反馈
                  </span>
                ) : (
                  <span>
                    为了可以更好的解决您的问题，请{" "}
                    <a href={`/auth/login?refer=${window.location.pathname}`}>
                      登录TapTap账号
                    </a>{" "}
                    提出反馈意见
                  </span>
                )}
              </span>

              <span
                className={`${styles.buttons} ${
                  isLoggedIn ? "" : styles.hidden
                }`}
              >
                <button
                  onClick={() => {
                    setContext(null);
                  }}
                >
                  取消
                </button>
                <button
                  className={styles.primary}
                  disabled={type === null || content.length === 0 || processing}
                  onClick={submitFeedback}
                >
                  提交
                </button>
              </span>
            </footer>
          </section>
        ) : (
          <section className={styles.empty}>
            <IconEmpty className={styles.icon} />
            <p>
              为了可以更好的解决您的问题，请{" "}
              <a href={`/auth/login?refer=${window.location.pathname}`}>
                登录TapTap账号
              </a>{" "}
              提出反馈意见
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

function Feedback() {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [feedbackStatistic, setFeedbackStatistic] = useState<FeedbackStatistic>(
    { count: 0, paragraphStatistics: [] }
  );
  const [context, setContext] = useState<FeedbackContext | null>(null);
  const [isToastOn, setIsToastOn] = useState<boolean>(false);

  const updateIsLoggedIn = () => {
    const isLoggedIn: boolean = getIsLoggedIn();
    setIsLoggedIn(isLoggedIn);
  };

  const updateFeedbackStatistic = async () => {
    const feedbackStatistic: FeedbackStatistic = await fetchFeedbackStatistic();
    setFeedbackStatistic(feedbackStatistic);
  };

  const showToast = () => {
    setIsToastOn(true);

    setTimeout(() => {
      setIsToastOn(false);
    }, 5000);
  };

  const ENABLED_DOMAINS = [
    "developer.taptap.cn",
    "developer.taptap.io",
    "developer.xdrnd.cn",
    "developer-intl.xdrnd.com",
  ];
  const ENABLED_LOCALES = ["zh-Hans"];

  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (enabled) {
      updateIsLoggedIn();
      updateFeedbackStatistic();
    }
  }, [enabled]);

  useEffect(() => {
    if (
      ENABLED_DOMAINS.includes(window.location.host) &&
      ENABLED_LOCALES.includes(currentLocale)
    ) {
      setEnabled(true);
    }
  }, []);

  return enabled ? (
    <div className={styles.feedback}>
      <SelectionFeedbackBtn context={context} setContext={setContext} />
      <ParagraphFeedbackBtn
        feedbackStatistic={feedbackStatistic}
        context={context}
        setContext={setContext}
      />
      <PageFeedbackBtn
        feedbackCount={feedbackStatistic.count}
        context={context}
        setContext={setContext}
      />

      {context ? (
        <FeedbackModal
          isLoggedIn={isLoggedIn}
          context={context}
          setContext={setContext}
          showToast={showToast}
        />
      ) : (
        <></>
      )}

      {isToastOn ? (
        <div className={styles.toastWrapper}>
          <div className={styles.toast}>
            <IconSuccess className={styles.icon} />
            <span>反馈成功，经官方确认后将对外展示。</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
}

type Props = WrapperProps<typeof MDXContentType>;


export default function MDXContentWrapper(props: Props): JSX.Element {


  return (
      <>
        <MDXContent {...props} />
        <Feedback />
      </>
  );
}
