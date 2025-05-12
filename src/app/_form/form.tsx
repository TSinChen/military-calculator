"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./form.module.scss";
import dayjs from "dayjs";

const THIS_YEAR = dayjs().year();
const YEAR_OPTIONS = [THIS_YEAR - 1, THIS_YEAR, THIS_YEAR + 1];
const THIS_MONTH = dayjs().month();
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, index) => index);
const DISCOUNT_OPTIONS = Array.from({ length: 31 }, (_, index) => index);
const TODAY = dayjs().hour(0).second(0);

export default function Form() {
  const [year, setYear] = useState(THIS_YEAR);
  const [month, setMonth] = useState(THIS_MONTH);
  const [date, setDate] = useState(TODAY.date());
  const [discount, setDiscount] = useState(0);
  const [result, setResult] = useState(
    "填完入伍日期還有折抵天數後就按下計算吧！"
  );

  const dateOptions = useMemo(
    () =>
      Array.from(
        {
          length: dayjs().month(month).daysInMonth(),
        },
        (_, index) => index
      ),
    [month]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endDate = dayjs()
      .year(year)
      .month(month)
      .date(date)
      .add(365, "day")
      .subtract(discount, "day")
      .subtract(1, "day");
    let workDayCount = 0;
    for (let i = 0; i <= endDate.diff(TODAY, "day"); i++) {
      const currentDate = TODAY.add(i, "day");
      if (currentDate.day() > 0 && currentDate.day() < 6) {
        workDayCount++;
      }
    }
    if (endDate.isBefore(dayjs())) {
      setResult(`你已經在 ${endDate.format("YYYY 年 MM 月 DD 日")}退伍了！`);
    } else {
      setResult(
        `你將會在 ${endDate.format(
          "YYYY 年 MM 月 DD 日"
        )}回歸自由，\n距離那天還有 ${endDate.diff(
          TODAY,
          "day"
        )} 天！\n在營天數還有 ${workDayCount} 天！（未扣除國定假日）`
      );
    }
  };

  useEffect(() => {
    setYear(Number(localStorage.getItem("year")) || THIS_YEAR);
    setMonth(Number(localStorage.getItem("month")) || THIS_MONTH);
    setDate(Number(localStorage.getItem("date")) || TODAY.date());
    setDiscount(Number(localStorage.getItem("discount")) || 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("year", String(year));
  }, [year]);

  useEffect(() => {
    localStorage.setItem("month", String(month));
  }, [month]);

  useEffect(() => {
    localStorage.setItem("date", String(date));
  }, [date]);

  useEffect(() => {
    localStorage.setItem("discount", String(discount));
  }, [discount]);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form__item}>
          <label className={styles.form__label} htmlFor="year">
            入伍日期
          </label>
          <div className={styles.form__value}>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <span className={styles.form__unit}>年</span>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {MONTH_OPTIONS.map((month) => (
                <option key={month} value={month}>
                  {month + 1}
                </option>
              ))}
            </select>
            <span className={styles.form__unit}>月</span>
            <select
              value={date}
              onChange={(e) => setDate(Number(e.target.value))}
            >
              {dateOptions.map((date) => (
                <option key={date} value={date}>
                  {date + 1}
                </option>
              ))}
            </select>
            <span className={styles.form__unit}>日</span>
          </div>
        </div>
        <div className={styles.form__item}>
          <label className={styles.form__label} htmlFor="discount">
            折抵天數
          </label>
          <div className={styles.form__value}>
            <select
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            >
              {DISCOUNT_OPTIONS.map((discount) => (
                <option key={discount} value={discount}>
                  {discount}
                </option>
              ))}
            </select>
            <span className={styles.form__unit}>天</span>
          </div>
        </div>
        <button type="submit">計算</button>
      </form>
      <hr className={styles.divider}></hr>
      <h3 className={styles.result}>{result}</h3>
    </>
  );
}
