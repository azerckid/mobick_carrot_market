import { NextRequest } from "next/server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

interface User {
  id: number;
}

const Login = async (user: User) => {
  const session = await getSession();
  if (user !== null) {
    session.id = Number(user.id);
  }
  await session.save();
  return redirect("/profile");
};

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  // 3. request user email
  //   const userEmailResponse = await fetch("https://api.github.com/user/emails", {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //     cache: "no-cache",
  //   });
  //   console.log(await userEmailResponse.json());

  const userData = await userProfileResponse.json();
  console.log(userData);
  const { id, avatar_url, login, email } = userData;
  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await Login(user);
  }
  // ❤️ code challenge
  // 1. if username is already taken, we can add something to the end of it to make it unique like ${login}${id}
  const takenUsername = await db.user.findUnique({
    where: {
      username: login,
    },
    select: {
      username: true,
    },
  });
  if (!takenUsername) {
    const newUser = await db.user.create({
      data: {
        username: login,
        email,
        github_id: id + "",
        avatar: avatar_url,
      },
      select: {
        id: true,
      },
    });
    Login(newUser);
  } else {
    const newUser = await db.user.create({
      data: {
        username: `${login}${id}`,
        email,
        github_id: id + "",
        avatar: avatar_url,
      },
      select: {
        id: true,
      },
    });
    Login(newUser);
  }

  // 2. make login function to do not repeat the code
}
