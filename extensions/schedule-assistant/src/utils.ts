import osascript from 'osascript-tag';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function parseDate(date: Date, dateString: string) {
    const today = new Date(); new Date()
    if (dateString.toLowerCase() == 'today') {
        date.setDate(today.getDate());
    } else if (dateString.toLowerCase() == 'tomorrow') {
        date.setDate(today.getDate() + 1)
    } else if (DAYS.includes(dateString)) {
        const dayIndex = DAYS.indexOf(dateString);
        const diff = (dayIndex - date.getDay() + 7) % 7;
        date.setDate(today.getDate() + diff);
    } else {
        if (/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/.exec(dateString)) {
            // Format: YYYY-MM-DD
            const dateParts = dateString.split(/[-/]/);
            date.setFullYear(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
        } else if (/^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/.exec(dateString)) {
            // Format: MM/DD
            const dateParts = dateString.split(/[-/]/);
            date.setFullYear(today.getFullYear(), Number(dateParts[0]), Number(dateParts[1]));
        }
    }     
}

export function parseTime(time: Date, timeString: string) {
    let m;

    if ((m = /^(\d{1,2})am$/.exec(timeString))) {
        // Match format: '8am'
        time.setHours(parseInt(m[1]), 0, 0, 0);
    } else if ((m = /^(\d{1,2}):(\d{2})am$/.exec(timeString))) {
        // Match format: '10:34am'
        time.setHours(parseInt(m[1]), parseInt(m[2]), 0, 0);
    } else if ((m = /^(\d{1,2})pm$/.exec(timeString))) {
        // Match format: '3pm', convert to 24-hour format
        const hr = parseInt(m[1]);
        time.setHours(hr === 12 ? hr : hr + 12, 0, 0, 0);
    } else if ((m = /^(\d{1,2}):(\d{2})pm$/.exec(timeString))) {
        // Match format: '3:45pm', convert to 24-hour format
        const hr = parseInt(m[1]);
        time.setHours(hr === 12 ? hr : hr + 12, parseInt(m[2]), 0, 0);
    } else if ((m = /^(\d{1,2}):(\d{2})$/.exec(timeString))) {
        // Match format: '13:00'
        time.setHours(parseInt(m[1]), parseInt(m[2]), 0, 0);
    } else if ((m = /^(\d{1,2})$/.exec(timeString))) {
        // Match format: '14'
        time.setHours(parseInt(m[1]), 0, 0, 0);
    }
  
    //TODO: need to consider wrong format of timeString
    return undefined; // undefined if no format matches
}

export const executeJxa = async (script: string) => {
    try {
        const result = await osascript.jxa({ parse: true })`${script}`;
        console.log("Result from JXA script:" + JSON.stringify(result));
        return result;
    } catch (err: unknown) {
      if (typeof err === 'string') {
        const message = err.replace('execution error: Error: ', '');
        console.log(err);
        //TODO: show error to the user
      }
      console.log("Error when executing JXA: " + err);
    }
};