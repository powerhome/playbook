type DateTimeType = {
  value: string | Date,
  zone?: string,
}

const ABBR_DAYS = ['SU', 'M', 'T', 'W', 'TH', 'F', 'S'];

export default class DateTime {
  value: any
  constructor({ value, zone = 'America/New_York' }: DateTimeType) {
    this.value = this.convertToTimestampZone(value, zone)
  }

  convertToTimestampZone(value: string | Date, zone: string) {
    const date = new Date(value);
    return new Date(date.toLocaleString('en-US', { timeZone: zone }));
  }

  convertToTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  toCustomFormat(format = '%-m/%-d') {
    return this.value.toLocaleDateString('en-US', { timeZone: this.convertToTimezone(), formatMatcher: 'basic', month: 'numeric', day: 'numeric' }).replace(/(\d+)\/(\d+)/, format);
  }

  toYear() {
    return this.value.getFullYear().toString();
  }

  toMonth() {
    return this.value.toLocaleString('en-US', { timeZone: this.convertToTimezone(), formatMatcher: 'basic', month: 'short' });
  }

  toMonthNum() {
    return (this.value.getMonth() + 1).toString();
  }

  toMonthFull() {
    return this.value.toLocaleString('en-US', { timeZone: this.convertToTimezone(), formatMatcher: 'basic', month: 'long' });
  }

  toDay() {
    return this.value.getDate().toString();
  }

  toDayAbbr() {
    return ABBR_DAYS[this.value.getDay()];
  }

  toWeekday() {
    return this.value.toLocaleString('en-US', { timeZone: this.convertToTimezone(), formatMatcher: 'basic', weekday: 'short' });
  }

  toHour() {
    return this.value.toLocaleString('en-US', { timeZone: this.convertToTimezone(), formatMatcher: 'basic', hour: 'numeric', hour12: true });
  }

  toMinute() {
    return this.value.toLocaleString('en-US', {
      timeZone: this.convertToTimezone(),

      formatMatcher: 'basic', minute: '2-digit'
    });
  }

  toMeridian() {
    return this.value.toLocaleString('en-US', { timeZone: this.convertToTimezone(), formatMatcher: 'basic', hour: 'numeric', hour12: true }).slice(-2).toUpperCase();
  }

  toIso() {
    return this.value.toISOString();
  }

  toTime() {
    const time = this.toHour() + ':' + this.toMinute();

    // Intl.DateTimeFormat adds a leading 0 on single hour times. ie 08:31.
    // this removes that 0 to match the moment.js implementation.
    return time.charAt() === '0' ? time.slice(1) : time;
  }

  toTimezone() {
    return this.convertToTimezone();
  }

  toTimeWithMeridian() {
    return this.toTime() + this.toMeridian();
  }
}
