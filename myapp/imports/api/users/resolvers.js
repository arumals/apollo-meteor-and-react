import get from 'lodash/get';

// export the resolver
export default {
  Query: {
    user(obj, args, context){
      return context.user || {};
    }
  },
  User: {
    email: (user) => get(user,'emails[0].address',''),
  }
}