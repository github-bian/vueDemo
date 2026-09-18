# Git 异常场景练习手册

> 用途：本地练习 git 异常处理。每个场景分「制造异常」和「解决步骤」两段，照着敲即可。
>
> 建议：用一个专门的练习仓库，每个场景练完 `git status` 确认状态干净再练下一个。

## 环境准备（只需做一次）

```bash
mkdir git-practice && cd git-practice
git init
git config user.name "practice"
git config user.email "practice@example.com"

echo "1" > a.txt
git add a.txt && git commit -m "init: a.txt"

echo "2" > b.txt
git add b.txt && git commit -m "init: b.txt"
```

---

## 场景 1：撤销工作区改动（改错了想丢弃）

**制造异常**

```bash
echo "错误的改动" >> a.txt
git status   # 显示 a.txt 被修改
```

**解决步骤**

```bash
git restore a.txt        # 丢弃改动，回到上次提交状态
# 老写法：git checkout -- a.txt
git status               # 干净了
```

---

## 场景 2：撤销暂存（git add 加错了，退回工作区）

**制造异常**

```bash
echo "xxx" >> a.txt
git add a.txt            # 已经暂存
git status               # 显示 Changes to be committed
```

**解决步骤**

```bash
git restore --staged a.txt   # 取消暂存，改动回到工作区（未暂存）
# 老写法：git reset HEAD a.txt
git status                   # 变成 Changes not staged
git restore a.txt            # 再丢弃，就彻底干净了
```



---

## 场景 3：commit 信息写错 / 漏提交了文件

**制造异常**

```bash
echo "3" >> a.txt
git add a.txt
git commit -m "fix bug"      # 信息写得太随便了
```

**解决步骤（改信息）**

```bash
git commit --amend -m "fix: 优化 a.txt 逻辑"
git log --oneline            # 看信息已改
```

**解决步骤（漏文件）**

```bash
echo "4" > c.txt
git add c.txt
git commit --amend --no-edit # 把 c.txt 并进上一次提交，信息不变
git log --oneline            # 提交数没增加
```

---

## 场景 4：提交错了，撤销提交（三种 reset）

**制造异常**

```bash
echo "坏提交" >> a.txt
git add a.txt && git commit -m "这次提交错了"
```

**解决方式 A：撤销提交，改动回到暂存区**

```bash
git reset --soft HEAD~1
git status   # 改动还在，处于已暂存状态
```

**解决方式 B：撤销提交，改动回到工作区（未暂存）**

```bash
git reset --mixed HEAD~1     # 等同 git reset HEAD~1（默认）
git status   # 改动还在，未暂存
```

**解决方式 C：彻底丢弃这次提交和改动（危险）**

```bash
git reset --hard HEAD~1
git status   # 改动也没了，回到提交前
```

> 记忆：`--soft` 只撤提交、`--mixed` 撤提交+暂存、`--hard` 全丢。

---

## 场景 5：合并冲突（merge conflict）

**制造异常**

```bash
# 在 main 改 f.txt
echo "main 版本1" > f.txt
git add f.txt && git commit -m "main 改 f"

# 开 feature 分支也改 f.txt
git switch -c feature
echo "feature 版本" > f.txt
git commit -am "feature 改 f"

# 回到 main 再改一次 f.txt
git switch main
echo "main 版本2" > f.txt
git commit -am "main 再改 f"

# 合并，冲突！
git merge feature
# 报错：CONFLICT (content): Merge conflict in f.txt
```

**解决步骤**

```bash
git status              # 看冲突文件是 f.txt
# 手动编辑 f.txt，删除 <<<<<<< ======= >>>>>>> 标记，保留想要的内容
git add f.txt           # 标记冲突已解决
git commit              # 完成合并（或 git merge --continue）
git log --oneline       # 看合并提交
```

> 放弃合并、回到合并前：`git merge --abort`

---

## 场景 6：rebase 冲突

**制造异常**

```bash
# 接场景 5 的 feature 分支，让它落后 main
git switch feature
echo "feature 新改" >> f.txt
git commit -am "feature 再改"
git rebase main         # 冲突！
```

**解决步骤**

```bash
git status              # 看冲突文件
# 手动编辑解决冲突
git add f.txt
git rebase --continue   # 继续变基
git log --oneline --graph
```

> 中途想放弃：`git rebase --abort`；想跳过当前提交：`git rebase --skip`

---

## 场景 7：误删文件找回

**制造异常**

```bash
rm a.txt                # 手滑删了
git status              # 显示 deleted: a.txt
```

**解决步骤**

```bash
git restore a.txt       # 从 HEAD 恢复
# 老写法：git checkout -- a.txt
git status              # 干净
```

> 如果已经 `git add` 了删除操作，先 `git restore --staged a.txt` 再 `git restore a.txt`。

---

## 场景 8：提交搞丢了 / 误删分支，用 reflog 找回

**制造异常**

```bash
git branch backup       # 建一个分支，假装有提交在上面
git checkout backup
echo "重要内容" >> a.txt && git commit -am "重要提交"
git switch main
git branch -D backup    # 手滑把分支删了
```

**解决步骤**

```bash
git reflog                       # 找到 backup 最后一次提交的 hash（比如 abc1234）
git branch backup abc1234        # 用 hash 恢复分支
git log backup --oneline         # 提交还在
```

> `reflog` 记录了你所有的 HEAD 移动，`reset --hard` 丢了提交也能用它找回。

---

## 场景 9：detached HEAD（游离头指针）

**制造异常**

```bash
git log --oneline                # 拿一个 commit hash，比如 1234567
git checkout 1234567             # 进入 detached HEAD
# 提示：You are in 'detached HEAD' state
```

**解决步骤**

```bash
# 想在此基础上继续开发，必须新建分支
git switch -c new-branch         # 从当前位置建分支，头指针回归正常
git status
```

> 如果在 detached 状态直接 commit，切走后那个提交可能“漂走”，所以务必先建分支。

---

## 场景 10：push 被拒（本地落后远程）

**制造异常（需要远程仓库，可用本地 bare 仓库模拟）**

```bash
# 建一个“远程”仓库
cd .. && git clone --bare git-practice remote.git
cd git-practice && git remote add origin ../remote.git
git push -u origin main

# 让“远程”领先：另开一个目录提交并 push
cd .. && git clone remote.git other
cd other && echo "远程新提交" >> a.txt && git commit -am "远程改" && git push origin main

# 回到原仓库，本地提交后 push 被拒
cd ../git-practice
echo "本地提交" >> a.txt && git commit -am "本地改"
git push origin main
# 报错：! [rejected] 提示远程有本地没有的提交
```

**解决步骤**

```bash
git pull --rebase origin main    # 先拉取并变基
# 若有冲突：编辑解决 → git add → git rebase --continue
git push origin main             # 成功
```

---

## 场景 11：stash 跨分支（功能写一半被打断）

**制造异常**

```bash
echo "功能改动" >> a.txt
# 未写完，先暂存不提交
git stash push -u -m "wip: 功能改动"
git stash list            # 看到 stash@{0}
git status                # 工作区干净
```

**解决步骤（切分支干别的，再回来恢复）**

```bash
git switch -c other
echo "别的活" >> b.txt && git commit -am "干别的活"
git switch main
git stash list            # stash 还在，没丢
git stash pop             # 恢复刚才的功能改动
git status                # a.txt 的改动回来了
```

---

## 场景速查表

| 需求           | 命令                                               |
| ------------ | ------------------------------------------------ |
| 丢弃工作区改动      | `git restore <file>`                             |
| 取消暂存         | `git restore --staged <file>`                    |
| 改最近一次提交信息    | `git commit --amend -m "..."`                    |
| 补文件进上次提交     | `git add <file> && git commit --amend --no-edit` |
| 撤提交保留改动(暂存)  | `git reset --soft HEAD~1`                        |
| 撤提交保留改动(工作区) | `git reset --mixed HEAD~1`                       |
| 撤提交并丢弃改动     | `git reset --hard HEAD~1`                        |
| 放弃合并         | `git merge --abort`                              |
| 放弃变基         | `git rebase --abort`                             |
| 找回丢失的提交/分支   | `git reflog`                                     |
| 游离头指针建分支     | `git switch -c <name>`                           |
| 本地落后远程被拒     | `git pull --rebase && git push`                  |
| 暂存未完成改动      | `git stash push -u -m "..."`                     |
| 恢复暂存         | `git stash pop`                                  |





哈哈哈哈哈