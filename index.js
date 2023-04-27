import fs from "fs";
import path from "path";
import axios from "axios";
import moment from "moment-timezone";
import bsky from "@atproto/api";
import dotenv from "dotenv";
dotenv.config();

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
  let response = [];
  data.codes.map(item => {
    response = response.concat(item.uses);
  });
  console.log(response)
  return response;
}

async function getPlcDir(did) {
  const response = await axios.get(
    "https://plc.directory/" + did + "/log/audit"
  );
  return response.data;
}

const now = moment().tz("Asia/Tokyo");

// const userlist = JSON.parse(fs.readFileSync("./userlist.json", "utf-8"));
await login({identifier: process.env.USER, password: process.env.PASS});
const userlist = await getInviteCodes();
const fileout = {};

for (const user of userlist) {
  const data = await getPlcDir(user.usedBy);
  let logs = data.map((item) => {
    return {
      did: item.did,
      handle: item.operation.alsoKnownAs[0],
      created: moment(item.createdAt)
        .tz("Asia/Tokyo")
        .format("YYYY/MM/DD HH:mm:ss"),
    };
  });
  fileout[user.usedBy] = logs;
}

const outputPath = path.join(
  process.cwd(),
  "out",
  now.format("YYYYMMDD_HHmmss") + ".json"
);
fs.writeFileSync(outputPath, JSON.stringify(fileout, null, 2));
