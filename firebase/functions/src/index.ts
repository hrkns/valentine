import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';

admin.initializeApp();

const request = functions.https.onRequest;
const corsFn = cors();

const httpResponse = (response:functions.Response, successResponse:string|object, errorResponse:any) => {
  const status = errorResponse ? 400 : 200;
  const msg = errorResponse ? errorResponse : successResponse;
  response.status(status).send(msg);
}

const ref = (_ref: string) => {
  return admin.database().ref(`/${_ref}`);
}

const workPeriodsStartDateCollectionName = 'work-periods-start-date';

const getFromDbWorkPeriodsStartDate = (callback:any) => {

  ref(workPeriodsStartDateCollectionName)
    .limitToFirst(1)
    .on('value', callback);
};

const fnRequest = function(fn: any) {

  return request(async (req, res) => {

    corsFn(req, res, () => {

      fn(req, res);
    });
  });
}

export const setWorkPeriodsStartDate = fnRequest((req: any, res: any) => {

  const payload = {
    start_date : req.body.start_date,
  };

  // tslint:disable-next-line: no-floating-promises
  ref(workPeriodsStartDateCollectionName)
    .remove(() => {

      ref(workPeriodsStartDateCollectionName).push({
        start_date: payload.start_date,
      }, error => {
  
        httpResponse(res, 'Establecido inicio de ciclos de 4 dias.', error);
      });
    });
});

export const getWorkPeriodsStartDate = fnRequest((req: any, res: any) => {

  getFromDbWorkPeriodsStartDate((value:any) => {

    value.forEach((first:any) => {

      httpResponse(res, first, null);
    });
  });
});
