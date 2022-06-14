import { PostMutations } from './PostMutation';
import { UserMutations } from './UserMutations';

export const Mutation = {
  ...PostMutations,
  ...UserMutations,
};
