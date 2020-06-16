import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const request = functions.https.onRequest;

const httpResponse = (error:any, response:functions.Response, message?:string|object) => {
  const status = error ? 400 : 200;
  const msg = error ? error : message;
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

export const setWorkPeriodsStartDate = request(async (req, res) => {

    const payload = {
      start_date : req.body.start_date,
    };

    // tslint:disable-next-line: no-floating-promises
    ref(workPeriodsStartDateCollectionName)
      .remove(() => {

        ref(workPeriodsStartDateCollectionName).push({
          start_date: payload.start_date,
        }, error => {
    
          httpResponse(error, res, 'Establecido inicio de ciclos de 4 dias.');
        });
      });
});

export const getWorkPeriodsStartDate = request(async (req, res) => {

  getFromDbWorkPeriodsStartDate((value:any) => {

    value.forEach((first:any) => {

      httpResponse(null, res, first);
    });
  });
});
