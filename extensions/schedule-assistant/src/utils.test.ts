import {
  parseDate,
  parseTime,
} from './utils';

describe('parseTime', () => {

    test('parseTime should be able to handle the format of 9am', () => {
        const date = new Date("2023-1-1 00:00:00");
        parseTime(date, "9am");
        expect(date.getHours()).toEqual(9);
        expect(date.getMinutes()).toEqual(0);
    });

    test('parseTime should be able to handle the format of 3pm', () => {
        const date = new Date("2023-1-1 00:00:00");
        parseTime(date, "3pm");
        expect(date.getHours()).toEqual(15);
        expect(date.getMinutes()).toEqual(0);
    });

    test('parseTime should be able to handle the format of 3:30pm', () => {
        const date = new Date("2023-1-1 00:00:00");
        parseTime(date, "3:30pm");
        expect(date.getHours()).toEqual(15);
        expect(date.getMinutes()).toEqual(30);
    });

    test('parseTime should be able to handle the format of 12pm', () => {
        const date = new Date("2023-1-1 00:00:00");
        parseTime(date, "12pm");
        expect(date.getHours()).toEqual(12);
        expect(date.getMinutes()).toEqual(0);
    });

    test('parseTime should be able to handle the format of 14', () => {
        const date = new Date("2023-1-1 00:00:00");
        parseTime(date, "14");
        expect(date.getHours()).toEqual(14);
        expect(date.getMinutes()).toEqual(0);
    });

    test('parseTime should be able to handle the format of 7:00', () => {
        const date = new Date("2023-1-1 00:00:00");
        parseTime(date, "7:00");
        expect(date.getHours()).toEqual(7);
        expect(date.getMinutes()).toEqual(0);
    });

    test('parseTime should be able to handle the format of 20:15', () => {
        const date = new Date("2023-1-1 00:00:00");
        parseTime(date, "20:15");
        expect(date.getHours()).toEqual(20);
        expect(date.getMinutes()).toEqual(15);
    });
});

describe('parseDate', () => {

    test('parseDate should be able to handle the format of 2024-11-24', () => {
        const date = new Date("2023-1-1 00:00:00");
        parseDate(date, "2024-11-24");
        expect(date.getFullYear()).toEqual(2024);
        expect(date.getMonth()).toEqual(11);
        expect(date.getDate()).toEqual(24);
    });

    test('parseDate should be able to handle the format of 2024-1-24', () => {
        const date = new Date("2023-1-1 00:00:00");
        parseDate(date, "2024-1-24");
        expect(date.getFullYear()).toEqual(2024);
        expect(date.getMonth()).toEqual(1);
        expect(date.getDate()).toEqual(24);
    });

    test('parseDate should be able to handle the format of 2024-10-6', () => {
        const date = new Date("2023-1-1 00:00:00");
        parseDate(date, "2024-10-6");
        expect(date.getFullYear()).toEqual(2024);
        expect(date.getMonth()).toEqual(10);
        expect(date.getDate()).toEqual(6);
    });

    test('parseDate should be able to handle the format of 2024-5-07', () => {
        const date = new Date("2023-1-1 00:00:00");
        parseDate(date, "2024-5-07");
        expect(date.getFullYear()).toEqual(2024);
        expect(date.getMonth()).toEqual(5);
        expect(date.getDate()).toEqual(7);
    });

});
