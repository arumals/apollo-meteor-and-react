import Goals from './collection';

export default {
  Mutation: {
    createGoal(obj, args, context){
      if(!context.userId) {
        throw new Error('Unauthorized');
      }
      const goalId = Goals.insert({ 
        name: args.name, 
        resolutionId: args.resolutionId,
        completed: false,
      });
      return Goals.findOne(goalId);
    },
    toggleGoal(obj, args, context){
      const { completed } = Goals.findOne(args.id);
      Goals.update(args.id, { $set : { completed: !completed } });
      return Goals.findOne(args.id);
    }
  }
}