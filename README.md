## Date-formatter

Assumes input data in the form of:

```json
{
  "day": [
    { 
      "type": "open", // Can be "open" or "closed"
      "value": 16000, // Time of event in seconds
    }
  ]
}
```

A simple app that renders restaurant opening times by arranging the above data structure into a list of events that occur in a given week. These events are then ordered and displayed according to the day the restaurant opens. 

Components are structured according to the following diagram:

![Component Structure]](images/class_diagram.png)