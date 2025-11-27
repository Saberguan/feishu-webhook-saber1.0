export const config = {
  api: {
    bodyParser: false, // ❗先关闭 Next.js 默认 body 解析
  },
};

export default async function handler(req, res) {

  // 手动读取 raw body
  const rawBody = await getRawBody(req);
  let body;

  try {
    body = JSON.parse(rawBody.toString());
  } catch (e) {
    return res.status(200).json({ code: 0, msg: "invalid json" });
  }

  // 飞书 challenge 校验（关键！！！）
  if (body.challenge) {
    return res.status(200).json({
      challenge: body.challenge,
    });
  }

  // 其他事件
  return res.status(200).json({ code: 0, msg: "ok" });
}

// 工具函数：读取 raw body
function getRawBody(req) {
  return new Promise(resolve => {
    let data = [];
    req.on("data", chunk => {
      data.push(chunk);
    });
    req.on("end", () => {
      resolve(Buffer.concat(data));
    });
  });
}
