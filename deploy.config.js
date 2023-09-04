module.exports = {
  apps: [
    {
      name: "JCWD-2402-02", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8242,
      },
      time: true,
    },
  ],
};
