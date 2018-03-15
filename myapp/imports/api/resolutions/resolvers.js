import Resolutions from './resolutions';
import Goals from './../goals/collection';

export default {
  Query: {
    resolutions(obj, args, context){
      return Resolutions.find({ userId: context.userId },{ sort: { name: 1 }}).fetch();
    }
  },
  Resolution: {
    goals: (resolution) => Goals.find({ resolutionId: resolution._id }).fetch(),
  },
  Mutation: {
    createResolution(obj, args, context){ // args contains the arguments sent to the mutation
      const resolutionId = Resolutions.insert({ name: args.name, userId: context.userId });
      return Resolutions.findOne(resolutionId);
    },
    updateResolution(obj, args, context){
      Resolutions.update(args.id, { $set : { name: args.name } });
      return Resolutions.findOne(args.id);
    },
    removeResolution(obj, args, context){
      Resolutions.remove(args.id);
      return { _id: args.id };
    }
  }
}