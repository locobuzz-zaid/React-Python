export default function (H) {
  H.setOptions({
    lang: {
      thousandsSep: ",",
      numericSymbols: ["k", "M", "G", "T", "P", "E"],
    },
  });
}

let spiral = "rectangular";
let placementStrategy = "center";
let selectedShapeType = "rectangular";
const customDeriveFontSize = (relativeWeight) => {
  var maxFontSize = 70;
  var minFontSize = 24;

  // let calculatedFontSize = Math.round(
  // 	(Math.ceil(maxFontSize * relativeWeight) +
  // 		Math.ceil(minFontSize * relativeWeight)) / 2
  // );
  let calculatedFontSize = Math.ceil(maxFontSize * relativeWeight);

  return calculatedFontSize >= 24 ? calculatedFontSize : 24;
};

const ovalSpiral = function archimedeanSpiral(t, c) {
  t *= 0.1;
  return {
    x: t * Math.cos(t),
    y: t * Math.sin(t),
  };
};
const getRandomPosition = (size) => {
  return Math.round((size * (Math.random() + 0.5)) / 2);
};
const randomHorizontalPlacement = (point, options) => {
  var field = options.field,
    r = options.rotation;
  return {
    x: getRandomPosition(field.width) - field.width / 2,
    y: getRandomPosition(field.height) - field.height / 2,
    rotation: 0,
  };
};

export const setHighchartWordCloudShape = (shape, Highcharts) => {
  //Highcharts.seriesTypes.wordcloud.prototype.deriveFontSize=customDeriveFontSize;
  //Highcharts.seriesTypes.wordcloud.prototype.spirals.archimedean = archimedeanSpiral;
  //Highcharts.seriesTypes.wordcloud.prototype.placementStrategy.random= randomPlacement;
  // Highcharts.setOptions({
  // 	colors: ["#3caac8"],
  // });
  if (shape !== undefined) {
    selectedShapeType = shape;
  }
  if (shape === "random") {
    Highcharts.seriesTypes.wordcloud.prototype.placementStrategy.random =
      randomHorizontalPlacement;
  }
  if (shape === "oval") {
    Highcharts.seriesTypes.wordcloud.prototype.spirals.oval = ovalSpiral;
  }
  return selectedShapeType;
};
export const getSelectedShapeType = () => {
  return "";
};
