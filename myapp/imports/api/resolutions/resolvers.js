import Resolutions from './resolutions';

export default {
  Query: {
    resolutions(){
      return Resolutions.find({},{ sort: { name: 1 }}).fetch();
    }
  },
  Mutation: {
    createResolution(obj, args, context){ // args contains the arguments sent to the mutation
      const resolutionId = Resolutions.insert({ name: args.name });
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