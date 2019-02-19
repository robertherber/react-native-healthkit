import React, { NativeModules } from 'react-native';
const { RNHealthKit } = NativeModules;

const promisify = (function ( slice ) {
	return function ( fn, context ) {
		return function () {
			var args = slice.call( arguments );

			return new Promise( function ( fulfil, reject ) {
				var callback = function ( err ) {
					if ( err ) return reject( err );
					fulfil.apply( null, slice.call( arguments, 1 ) );
				};

				args.push( callback );
				fn.apply( context, args );
			});
		};
	};
}( [].slice ));

const handleResponse = async (promiseGenerator, callback) => {
  try{
      const {reason, status } = await promiseGenerator(),
            success = status === 1;

      if(reason){
        throw new Error(reason);
      }

      if(callback){
        callback(null, success);
      }
      return success;
    } catch(e){
      if(callback){
        return callback(e);
      }
      throw e;
    }
}

const saveHealthDataPromise = promisify(RNHealthKit.saveHealthData);
const requestPermissionsPromise = promisify(RNHealthKit.requestPermissions);
const isSupportHealthKitPromise = promisify(RNHealthKit.isSupportHealthKit);

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const isSupportHealthKit = (callback) => {
  return handleResponse(() => isSupportHealthKitPromise(), callback);
};

export const requestPermissions = (permissions, callback) => {
  return handleResponse(() => requestPermissionsPromise(permissions), callback);
};

export const saveHealthData = ({ metadata = {}, ...data }, callback) => {
  Object.keys(metadata).forEach(key => {
    const prefixedKey = 'HKMetadataKey' + capitalize(key);
    const value = metadata[key];
    delete metadata[key];
    metadata[prefixedKey] = value;
  });

  Object.keys(data).forEach(key => {
    const capitalizedKey = capitalize(key);
    const value = data[key];
    delete data[key];
    data[capitalizedKey] = value;
  });

  return handleResponse(() => saveHealthDataPromise(data, metadata), callback)
}

export default module.exports;