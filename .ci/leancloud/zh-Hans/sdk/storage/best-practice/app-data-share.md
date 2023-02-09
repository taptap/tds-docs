# 应用间数据共享

应用之间的 Class 数据共享可以应用到很多地方，最简单的例子是绑定新应用的 `_User` 表到老应用的`_User` 表，就可以实现老应用的用户无需重新注册，就可以登录您的新应用。更多富有想象力的使用场景，等待您来挖掘。

## 设置

应用之间的数据共享功能，我们称之为 Class 绑定。

选中一个想要绑定到其他应用数据的 Class，点击其他菜单，可以看到 Class 绑定菜单的链接，点击即可进入：

![image](images/class_binding1.png)

![image](images/class_binding2.png)

进入 Class 绑定设置后，我们可以看到两个选择框和三个多选框：

* 选择目标应用，当前帐号下的所有应用都可以成为绑定的目标应用，协作应用和当前应用除外。
* 选择目标 Class，选定了目标应用之前，可以选择想要绑定的目标 Class。
* 选择需要共享的权限：`Read`，`Write` 和 `Delete`，选中相应权限，当前 `Class` 就可以读、写（插入和更新）以及删除共享的 Class 数据

示例中，我们将 BoundTest 这个 class 绑定到 benchmark 应用的 GameScore 类，并且赋予了读、写和删除的权限，绑定之后，BoundTest 显示的数据就是 GameScore 表的数据，两者共享了所有数据。更新任何一张表，都将影响到另一张表。

但是，如果想修改 Schema（增加、删除列）、批量修改数据（删除 class 或者清除所有数据）、修改索引都需要到目标 Class 才可以操作，这是为了防止将一个 Class 共享给多个应用之后，意外修改破坏了其他应用。

## Class 关联

只有名称相同的 Class 进行绑定后才可以使用关联 Relation。

例如：将应用 A 的 Class `Action` 绑定到应用 B 的 `Action`，就可以创建 Relation。而将应用 A 的 Class `Action` 绑定到应用 B 的 `APP_B_Action`，则无法创建 Relation 关联。如果无法让应用之间的 Class 名称保持一致，就需要自行创建中间表来维护关联条件了。

## 云引擎 Hook 函数

每个 Class 只能触发**其所属应用**的 hook 函数，不会触发所绑定的应用的 hook。

例如：应用 A 的 Class `Action_A` 已与应用 B 的 `Action_B` 进行了绑定，应用 B 为 `Action_B` 设置了 `afterSave` hook。当向 `Action_A` 中写入数据时并不会触发 `Action_B` 的 `afterSave`。

如果想让 `Action_A` 也触发相同的 hook 逻辑，则需要在应用 A 中部署同样的 `afterSave` hook。
