// @flow
import moment from 'moment';

export const vnDateFormat = 'DD-MM-YYYY';

// format the input Date object to VN date string
export const formatVNDate = (date: Date) => moment(date).format(vnDateFormat);
// convert from the input VN date string to date object
export const fromVNDate = (dateString: string) => moment(dateString, vnDateFormat).toDate();

export default formatVNDate;
