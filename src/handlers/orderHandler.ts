import { IncomingMessage, ServerResponse } from "http";
import IOTools from "../tools/requestTools";
import OrderService from "../services/orderService";

const ioTools = new IOTools();
const service = new OrderService();
const orderHandler: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
} = {
  POST: async (req, res) => {
    
  },
  PUT: async (req, res) => {},
};

export default orderHandler;
