export const FORM_DATA = [{ 
    "ref_id":1,
    "referenceType":"state", 
    "visible":true, 
    "values" : ["Abia","Abuja","Ebonyi","Imo","Lagos"]
  },
  { "name":"propertyType","label":"Property Type","required":false,"order":1,"controlType":"dropdown","visible":true,"disabled":false,
    "options":[
      {"key":"Duplex","value":"Duplex"},
      {"key":"Flat","value":"Flat"},
      {"key":"Self Contain","value":"Self Contain"},
      {"key":"Others","value":"Others"}
    ]
  },
  { "name":"roomType","label":"Room Type","required":true,"order":1,"controlType":"dropdown","visible":true,"disabled":false,
  "options":[
    {"key":"Standard","value":"Standard"},
    {"key":"Duluxe","value":"Duluxe"},
    {"key":"Gold","value":"Gold"},
    {"key":"Silver","value":"Silver"},
    {"key":"Bronze","value":"Bronze"}
  ]
}, 
{ "name":"tenure","label":"Tenure","required":true,"order":1,"controlType":"tenure_dropdown","visible":true,"disabled":false,
"options":[
  {"key":"Weekly","value":"Weekly"},
  {"key":"Monthly","value":"Monthly"},
  {"key":"Quartely","value":"Quarterly"},
  {"key":"Yearly","value":"Yearly"}
]
},
{ "name":"occupancy","label":"Occupancy","required":false,"order":1,"controlType":"dropdown","visible":true,"disabled":false,
"options":[
  {"key":1,"value":"1 Person"},
  {"key":2,"value":"2 Persons"},
  {"key":3,"value":"3 Persons"},
  {"key":4,"value":"4 Persons"},
  {"key":4,"value":"6 Persons"},
  {"key":4,"value":"8 Persons"},
  {"key":4,"value":"10 Persons"},
  {"key":5,"value":"N/A"}
]
},
  {
   "controlType": "timeRange", "visible": true, "label": "Start",
   "start": { "key": "stuStartTimeBegin", "value": "" },
   "end": { "key": "stuStartTimeEnd", "value": ""}
  },
  {
   "controlType": "timeRange", "visible": true, "label": "End",
   "start": { "key": "stuEndTimeBegin","value": "" },
   "end": { "key": "stuEndTimeEnd", "value": ""}
  },    
  { "key":"stuGradeLevel", "label":"Grade Level", "required":false,"order":1,"controlType":"textbox","visible":true,"disabled":false,"type":""},
  { 
    "controlType":"featureGroup", 
    "visible":true, 
    "list" : [
      {"name":"Bedroom","label":"Bedroom","required":false,"order":1,"controlType":"checkbox","visible":true,"disabled":true,"type":"",
        "items":[{"key":"Wardrobe","value":"Wardrobe","icon":""},{"key":"Mirror","value":"Mirror","icon":"center_focus_weak"}]
      },
      {"name":"Bathroom","label":"Bathroom","required":false,"order":1,"controlType":"checkbox","visible":true,"disabled":true,"type":"",
         "items":[{"key":"Mirror","value":"Mirror","icon":"center_focus_weak"},{"key":"wc","value":"WC","icon":"wc"},{"key":"Shower","value":"Shower","icon":"shower"},{"key":"Tub","value":"Bath Tub","icon":"pool"}]
    },
      {"name":"Kitchen","label":"Kitchen","required":false,"order":1,"controlType":"checkbox","visible":true,"disabled":true,"type":"",
      "items":[{"key":"Cabinet","value":"Cabinet","icon":""},{"key":"Granite Table Top","value":"Granite Table","icon":"center_focus_weak"}]
    },
      {"name":"Lounge","label":"Lounge","required":false,"order":1,"controlType":"checkbox","visible":true,"disabled":true,"type":"",
      "items":[{"key":"TV Cable","value":"TV Cable","icon":"tv"},{"key":"Air Conditioner ","value":"Air Conditioner","icon":"ac_unit"},{"key":"Air Conditioner ","value":"Air Conditioner"}]
    },
    ]
  }

];