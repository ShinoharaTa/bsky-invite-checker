# Blueskyの招待コード使用者を一覧表示します

## 初回セットアップ

```bash
npm install  
cp .env.example .env
```

envの設定をする

```bash
USER="shino3.bsky.social"
PASS=password
```

## 実行

```bash
node index.js
```

## 実行結果

```json
{
  "did:plc:pxl45temnwmcdad6ent7phf6": [
    {
      "did": "did:plc:pxl45temnwmcdad6ent7phf6",
      "handle": "at://shino6.bsky.social",
      "created": "2023/04/20 17:27:17"
    }
  ],
  "did:plc:ywzuqjn72f4bvpaitpbsohpb": [
    {
      "did": "did:plc:ywzuqjn72f4bvpaitpbsohpb",
      "handle": "at://shino2.bsky.social",
      "created": "2023/04/09 14:42:06"
    }
  ],
  "did:plc:x27xn4nydykp2sxegzwdosdq": [
    {
      "did": "did:plc:x27xn4nydykp2sxegzwdosdq",
      "handle": "at://shino1.bsky.social",
      "created": "2023/04/09 14:40:59"
    }
  ],
  "did:plc:whmzww6zz4anzgwc7ts6ls75": [
    {
      "did": "did:plc:whmzww6zz4anzgwc7ts6ls75",
      "handle": "at://shino5.bsky.social",
      "created": "2023/04/09 14:40:07"
    }
  ]
}  
```

## node version

v18

## docker環境

https://github.com/ShinoharaTa/node-docker

使用方法はリポジトリの説明を読んで下さい
