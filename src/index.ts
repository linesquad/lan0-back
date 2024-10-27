import { connectToDb } from "./tools/dbConnection";
import server from "./tools/server";
import config from "./config";

async function startServer() {
  try {
    await connectToDb();
    server.listen(process.env.PORT || config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error: any) {
    console.log("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}

startServer();
