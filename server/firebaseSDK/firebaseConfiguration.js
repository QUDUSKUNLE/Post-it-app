import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: 'post-it-app',
    private_key_id: '6c56680f1bd71f518a325396949017f054d10541',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQChp3oIgnw+/Vbg\neW07w1fs2mMt0EdUQ6Ht8DFWcNXAEypRLPWAVB+wrcQCtHfxfUFtWbtaVBZ9RW1B\nFMxuhhnqhwk1cxMrjHMQW0kE5b5NXPaw7Nua7FWd8ClDemQ3/JDu2m3pqFlPrFF5\naDUYjTd63kWdrNld96kJ/iwDTJV/gpnTSBwVkjokoUmxpIVadrdZBj6kW7Bnc7fq\nQkYA5yP1LXoMm7SqKHW4EGkHje12hlHcRMkTkb9xFYciRxrqwvfZnHwylKYmwgNW\nPoBID3tgT3zrH+y6pHXNoqTas/zlVEuwgToCAPoLGcWYcC8X2btS64BhY8lrvYJJ\nZtKT77sNAgMBAAECggEAT86iBb993Y8vK+Vm00FukCWFH2IbRPOa5yBVC0rrjEcp\n9iePEIr3lj9DbN5x9MwU2Aqb301ySOhUtvOwtcQI2WtPVY75YN+XEvUuSHewCvuh\nYtmc1ZBl+HJPvNuYzLcpSnKWHuwZI6d8Fccnp3ZYdJV1oxFpwuV5E9DjI8HUcL1d\nmwF12EcQqBDMMWp2goYVpyYXOwd8/unF2jteMXU6UN7kZbejVYSpWFj5szKQbTzn\nlNCCO8Vv4KfZ3me8ENxO0EbwWobh/K18UeBflcCtdILyzoq0cF/K3iS3LkYH6eha\nePYU5LMDx/QtsvRLuFuIS3mAe+/Z5ghKJvGxed6F1QKBgQDNCFsRNHFuNmmUgkMU\nv3tK973XX8qkAbRRmAfWFnmmc1fJnmx1B0kWd2nZ7jEWSeyUx9G22rZu/vz6suWu\nNFeTnLH/uiEHQE5Reeb6ND5Muo2q4LfQBDK++8KXlgmTgbWiyqBwUNunl87cKXu9\nNF/BvPOsdUk7r24E79lhL53rswKBgQDJ1qa+Wr1dPMxYQRtSg+vTtDJxp9fvEEwm\n77QZnlUfVcklbHOWB09zJtaiHmKEPWdKq91xVzPi7o6shmiEqH2z+QPlMWnwow9N\n80ANbEQK1dQecfMtdE3YmwPgNUxnskfuTS8AV+udStZ2ZYP/udENPV5c1v/JtAhn\nnvnAAt1ePwKBgAItbIoqPGonOcfR+lRmFDEfoGyBH+3N9tRHAQ5M/s29u9jwTcaQ\nZT5P1lfyJ6NM9a4+0QNYH0fefWFMNRQ8ihGPQHSuzVr+W9aRrNpLY7383TRLXqhe\n4wsUMWTauw9N+VfZPwryUOLewduktSO1Qq8UCqJyPGzd2BVFVtGpZ8vxAoGAALoR\nJ6ZUAD3zzm2Nl6J5+u0vMVGVaXr5izpZv63eSJqaetQFJokoNBXzt+m8GRXPhWlR\nBtN1kF+ji+OABNpGeZtv9CdVZlRv/aveky3MoO1cMi/e3E8K6LjGLsyCVe1CbQ1C\nGhI2+v4F/68l5onYwt9xs4vip+tKDHV6GMLp4SkCgYAsbY7lJqtdTvBAp7C6pqLQ\nQikgfb6pQjje+DxqwlopVZ6OPVbp8m4ITa7a6H5crw4pZ4+j1gQ8eEEzdMN5QZ86\n2jCQ2fT68casAMhl5jbiq7LeulPL3byCD0W1nVz43IEJcBBrgTfcO5MR0LJNS2GH\nmh2Tp43tLLEwk+t8JAY74A==\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-lm8e7@post-it-app.iam.gserviceaccount.com',
    client_id: '104880240888097416469',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://accounts.google.com/o/oauth2/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lm8e7%40post-it-app.iam.gserviceaccount.com'
  }),
  databaseURL: 'https://post-it-app.firebaseio.com'
});

export default admin;

