import { Context } from '../index';
interface ParentType {
  id: number;
  bio: string;
  userId: number;
}
export const Profile = {
  user: (parent: ParentType, _: any, { prisma, userInfo }: Context) => {
    return prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};
