# @kingstinct/react-native-healthkit

## References

Thank this project. I forked some code.
[https://github.com/ErlichChen/react-native-healthkit.git]
[https://github.com/terrillo/rn-apple-healthkit/blob/master/README.md] (originally)

Compared to ErlichChens version I added promise support and metadata support.


## How to install

1. Instal @kingstinct/react-native-healthkit package from npm.

```shell
npm install @kingstinct/react-native-healthkit --save
react-native link @kingstinct/react-native-healthkit
```

2. Update info.plist in your React Native project.

```xml
<key>NSHealthShareUsageDescription</key>
<string>Read and write health data.</string>
<key>NSHealthUpdateUsageDescription</key>
<string>Read and write health data.</string>
```

3. Enable HealthKit in your React Native project.

## How to use

### 1. import package

```javascript
import RNHealthKit from '@kingstinct/react-native-healthkit';
```


### 2. isSupportHealthKit

```javascript
const success = await RNHealthKit.isSupportHealthKit()
```

### 3. requestPermissions

```javascript
let permissions = {
    read: ['Weight', 'BloodGlucose', 'OxygenSaturation', 'BloodPressureSystolic', 'BloodPressureDiastolic', 'BodyTemperature', 'HeartRate'],
    write: ['Weight', 'BloodGlucose', 'OxygenSaturation', 'BloodPressureSystolic', 'BloodPressureDiastolic', 'BodyTemperature', 'HeartRate'],
};
const success = RNHealthKit.requestPermissions(permissions);
```

### 4. Save health data.

1. Save health weight data

```javascript
let healthData = {
    HKType: 'Weight',
    weight: 160,
    date: '2017-12-05 10:10:10',
    unit: 'lb'
}
const success = await RNHealthKit.saveHealthData(healthData);
```

2. Save health blood glucose

```javascript
let healthData = {
    HKType: 'BloodGlucose',
    bloodGlucose: 100,
    date: '2017-12-05 10:10:10',
    unit: 'mg/dL'
}
const success = await RNHealthKit.saveHealthData(healthData);
```

3. Save oxygensaturation data

```javascript
let healthData = {
    HKType: 'OxygenSaturation',
    oxygenSaturation: 0.99,
    date: '2017-12-05 10:10:10',
    unit: '%'
}
const success = await RNHealthKit.saveHealthData(healthData);
```

4. Save blood pressure data

```javascript
let healthData = {
    HKType: 'BloodPressure',
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 70,
    date: '2017-12-05 10:10:10',
    unit: 'mmhg'
}
const success = await RNHealthKit.saveHealthData(healthData);
```

5. Save heart rate data

```javascript
let healthData = {
    HKType: 'HeartRate',
    heartRate: 70,
    date: '2017-12-05 10:10:10',
    unit: 'cpm'
}
const success = await RNHealthKit.saveHealthData(healthData);
```

6. Save body temperature

```javascript
let healthData = {
    HKType: 'BodyTemperature',
    bodyTemperature: 20,
    date: '2017-12-05 10:10:10',
    unit: 'celsius'
}
const success = await RNHealthKit.saveHealthData(healthData);
```
