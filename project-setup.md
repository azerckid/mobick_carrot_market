```
❯ npx create-next-app@latest
Need to install the following packages:
create-next-app@14.2.7
Ok to proceed? (y) y

✔ What is your project named? … carrot-market-reloaded
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes
Creating a new Next.js app in /Users/namhyeongseog/Desktop/02_nextJS14/carrot-market-reloaded.

Using npm.

Initializing project with template: app-tw
```

### prisma 설치

```bash
npm install prisma
```

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:

1. Set the `DATABASE_URL` in the `.env` file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the `provider` of the `datasourc`e block in `schema.prisma` to match your database: `postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb`.
3. `Run prisma db pull` to turn your database schema into a Prisma schema.
4. `Run prisma generate` to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the `ORM` with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

npx prisma init 명령어를 통해 prisma 폴더를 생성하고 schema.prisma 파일을 생성한다.

```bash
npx prisma init
```

```
npm install @prisma/client
```

db를 수정할때 마다 migrate를 해줘야한다. name은 마이그레이션 이름이다.(git comment와 비슷한 개념)

```bash
npx prisma migrate dev
```

```bash
npx prisma generate
```

32자리의 랜덤한 문자열을 생성한다.비밀번호를 생성할때 사용하면 좋다.

```bash
openssl rand -base64 32
```

SUPABASE

```
npm install @supabase/supabase-js
```

```bash

```
