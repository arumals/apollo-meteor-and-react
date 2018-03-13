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
    }
  }
}