package kr.stockey.laboratoryservice.common.regression;

import org.apache.commons.math3.stat.regression.OLSMultipleLinearRegression;

import java.util.ArrayList;
import java.util.List;

public class RegressionUtil {

    public void regresionTest() {
        List<List<Double>> x = new ArrayList<>();
        List<Double> y = new ArrayList<>();

        // Add data points
        x.add(List.of(1.0, 2.0, 3.0));
        x.add(List.of(4.0, 5.0, 6.0));
        x.add(List.of(7.0, 8.0, 9.0));

        y.add(10.0);
        y.add(11.0);
        y.add(12.0);

        OLSMultipleLinearRegression regression = new OLSMultipleLinearRegression();

        double[][] xArray = convertListToArray1(x);
        double[] yArray = convertListToArray(y);

        regression.newSampleData(yArray, xArray);

        regression.setNoIntercept(true); // Optional: If you don't want an intercept term
        double[] beta = regression.estimateRegressionParameters();

        for (int i = 0; i < beta.length; i++) {
            System.out.println("Coefficient " + i + ": " + beta[i]);
        }
    }

    private static double[][] convertListToArray1(List<List<Double>> list) {
        int numRows = list.size();
        int numCols = list.get(0).size();
        double[][] array = new double[numRows][numCols];
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                array[i][j] = list.get(i).get(j);
            }
        }
        return array;
    }

    private static double[] convertListToArray(List<Double> list) {
        int size = list.size();
        double[] array = new double[size];
        for (int i = 0; i < size; i++) {
            array[i] = list.get(i);
        }
        return array;
    }

}
