import { myPrismaClient } from "../../utils/myPrismaClient";

export class UserRepository {
  constructor(prisma = myPrismaClient) {}
}
