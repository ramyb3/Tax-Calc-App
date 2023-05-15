//IRS variables
const FIRST_STEP = 6790;
const SECOND_STEP = 9730;
const THIRD_STEP = 15620;
const FOURTH_STEP = 21710;
const FIFTH_STEP = 45180;
const SIXTH_STEP = 58190;
const FIRST_PERCENTAGE = 0.1;
const SECOND_PERCENTAGE = 0.14;
const THIRD_PERCENTAGE = 0.2;
const FOURTH_PERCENTAGE = 0.31;
const FIFTH_PERCENTAGE = 0.35;
const SIXTH_PERCENTAGE = 0.47;
const SEVENTH_PERCENTAGE = 0.5;
const ONE_POINT = 235;
const MAX_PENSION = 7896 / 12;

// insurance variables
const INSURANCE = 7122;
const MAX_INSURANCE = 47465;
const MIN_HEALTH_PERCENTAGE = 0.031;
const MAX_HEALTH_PERCENTAGE = 0.05;
const MIN_SOCIAL_PERCENTAGE = 0.004;
const MAX_SOCIAL_PERCENTAGE = 0.07;

export default function calculateTaxes(data) {
  const points = parseFloat(data.points) || -1;
  const irsPaycheck = parseFloat(data.irs) || -1;
  const insurancePaycheck = parseFloat(data.insurance) || -1;
  let pension = parseFloat(data.pension) || 0;

  if (points < 0 || irsPaycheck < 0 || insurancePaycheck < 0 || pension < 0) {
    alert("צריך למלא את כל השדות!");
    return [];
  } else {
    let irs = 0;

    if (irsPaycheck > FIRST_STEP) {
      irs = calcFunc(FIRST_STEP, FIRST_PERCENTAGE);
    } else {
      irs = calcFunc(irsPaycheck, FIRST_PERCENTAGE);
    }
    if (irsPaycheck > FIRST_STEP) {
      if (irsPaycheck > SECOND_STEP) {
        irs += calcFunc(SECOND_STEP - (FIRST_STEP + 1), SECOND_PERCENTAGE);
      } else {
        irs += calcFunc(irsPaycheck - (FIRST_STEP + 1), SECOND_PERCENTAGE);
      }
    }
    if (irsPaycheck > SECOND_STEP) {
      if (irsPaycheck > THIRD_STEP) {
        irs += calcFunc(THIRD_STEP - (SECOND_STEP + 1), THIRD_PERCENTAGE);
      } else {
        irs += calcFunc(irsPaycheck - (SECOND_STEP + 1), THIRD_PERCENTAGE);
      }
    }
    if (irsPaycheck > THIRD_STEP) {
      if (irsPaycheck > FOURTH_STEP) {
        irs += calcFunc(FOURTH_STEP - (THIRD_STEP + 1), FOURTH_PERCENTAGE);
      } else {
        irs += calcFunc(irsPaycheck - (THIRD_STEP + 1), FOURTH_PERCENTAGE);
      }
    }
    if (irsPaycheck > FOURTH_STEP) {
      if (irsPaycheck > FIFTH_STEP) {
        irs += calcFunc(FIFTH_STEP - (FOURTH_STEP + 1), FIFTH_PERCENTAGE);
      } else {
        irs += calcFunc(irsPaycheck - (FOURTH_STEP + 1), FIFTH_PERCENTAGE);
      }
    }
    if (irsPaycheck > FIFTH_STEP) {
      if (irsPaycheck > SIXTH_STEP) {
        irs +=
          calcFunc(SIXTH_STEP - (FIFTH_STEP + 1), SIXTH_PERCENTAGE) +
          calcFunc(irsPaycheck - (FIFTH_STEP + 1), SEVENTH_PERCENTAGE);
      } else {
        irs += calcFunc(irsPaycheck - (FIFTH_STEP + 1), SIXTH_PERCENTAGE);
      }
    }

    if (pension > MAX_PENSION) {
      pension = MAX_PENSION;
    }

    irs = (irs - ONE_POINT * points - pension * FIFTH_PERCENTAGE).toFixed(2);

    if (irs < 0) {
      irs = 0;
    }

    ////////////////////////////////////////////////////////////////////////////

    let health = 0,
      social = 0;

    if (insurancePaycheck > INSURANCE) {
      if (insurancePaycheck < MAX_INSURANCE) {
        health =
          calcFunc(insurancePaycheck - INSURANCE, MAX_HEALTH_PERCENTAGE) +
          calcFunc(INSURANCE, MIN_HEALTH_PERCENTAGE);
        social =
          calcFunc(insurancePaycheck - INSURANCE, MAX_SOCIAL_PERCENTAGE) +
          calcFunc(INSURANCE, MIN_SOCIAL_PERCENTAGE);
      } else {
        health =
          calcFunc(MAX_INSURANCE - INSURANCE, MAX_HEALTH_PERCENTAGE) +
          calcFunc(INSURANCE, MIN_HEALTH_PERCENTAGE);
        social =
          calcFunc(MAX_INSURANCE - INSURANCE, MAX_SOCIAL_PERCENTAGE) +
          calcFunc(INSURANCE, MIN_SOCIAL_PERCENTAGE);
      }
    } else {
      health = calcFunc(insurancePaycheck, MIN_HEALTH_PERCENTAGE);
      social = calcFunc(insurancePaycheck, MIN_SOCIAL_PERCENTAGE);
    }

    health = health.toFixed(2);
    social = social.toFixed(2);

    //total taxes
    const total = (
      parseFloat(health) +
      parseFloat(social) +
      parseFloat(irs)
    ).toFixed(2);

    return [
      {
        num: social,
        text: "תשלום לביטוח לאומי",
      },
      {
        num: health,
        text: "תשלום לביטוח בריאות",
      },
      {
        num: irs,
        text: "תשלום למס הכנסה",
      },
      {
        num: total,
        text: 'סה"כ ניכויים',
      },
    ];
  }
}

const calcFunc = (x, y) => {
  return x * y;
};
