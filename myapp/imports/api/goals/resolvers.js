import Goals from './collection';

export default {
  Mutation: {
    createGoal(obj, args, context){
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