// @flow
import moment from 'moment';

export const formatDate = (date: Date) => moment(date).format('DD-MM-YYYY');

export default formatDate;
