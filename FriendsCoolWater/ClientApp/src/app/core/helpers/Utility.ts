import * as moment from 'moment';

export class Utility {

  getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  getDateFromDateTime(date: Date) {
    return moment(date).format("YYYY-MM-DD");
  }

}
