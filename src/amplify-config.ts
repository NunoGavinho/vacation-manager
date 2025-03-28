import { Amplify } from 'aws-amplify';
// @ts-ignore
const awsExports = require('../src/aws-exports').default;
Amplify.configure(awsExports);