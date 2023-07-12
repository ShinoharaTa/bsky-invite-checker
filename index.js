import bsky from "@atproto/api";
import { accounts } from "./accounts.js";

const { BskyAgent } = bsky;
let self = null;

const agent = new BskyAgent({ service: "https://bsky.social" });
const login = async function (params = { identifier, password }) {
  try {
    const { success, data } = await agent.login(params);
    self = data;
    return success ? data : null;
  } catch {
    return null;
  }
};

async function getInviteCodes() {
  const { data } = await agent.api.com.atproto.server.getAccountInviteCodes();
  let unuse = data.codes
    .filter((item) => item.uses.length === 0)
    .map((item) => {
      return item.code;
    });
  let use = data.codes
    .filter((item) => item.uses.length > 0)
    .map((item) => {
      return item.code;
    });
  return { unuse, use };
}

let unuses = 0;
let uses = 0;
for (const account of accounts) {
  await login({ identifier: account.user, password: account.pass });
  const { unuse, use } = await getInviteCodes();
  unuse.forEach((code) => {
    console.log(code);
  });
  unuses += unuse.length;
  uses += use.length;
}

console.log("uses total    :", uses);
console.log("unuses total  :", unuses);
