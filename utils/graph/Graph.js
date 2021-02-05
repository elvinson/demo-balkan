sap.ui.define([
  "megafon/utils/graph/GraphHandlers"
], function (GraphHandlers) {
  "use strict";
  
  function createTemplate() {
      OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
      OrgChart.templates.myTemplate.size = [300, 150];
      OrgChart.templates.myTemplate.field_0 =
        '<text class="field_0" style="font-size: 14px;" x="12" y="20" text-anchor="start">{val}</text>'; // position
      OrgChart.templates.myTemplate.field_1 =
        '<text class="field_1" style="font-size: 14px;" x="12" y="40" text-anchor="start">{val}</text>'; //orgeh
      OrgChart.templates.myTemplate.field_2 =
        '<text class="field_1" style="font-size: 13px;" fill="#ffffff" x="12" y="58" text-anchor="start">{val}</text>'; // city
      OrgChart.templates.myTemplate.field_3 =
        '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="48" y="90" text-anchor="start">{val}</text>'; // name
      OrgChart.templates.myTemplate.field_4 =
        '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="12" y="120" text-anchor="start">{val}</text>'; // money
      OrgChart.templates.myTemplate.field_5 =
        '<image class="vacant-icon" xlink:href="img/manager.png" x="12" y="125" width="20" height="20"></image>'
      + '<text class="field_3" style="font-size: 13px;" fill="#ffffff" x="35" y="139" text-anchor="start">{val}</text>'; // plans count
      OrgChart.templates.myTemplate.img_0 =
        '<clipPath id="ulaImg"><circle cx="27" cy="85" r="15"></circle></clipPath>'
      + '<image class="img_0" preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="12" y="70" width="30" height="30"></image>';
      OrgChart.templates.myTemplate.btn = "{val}";
      OrgChart.templates.myTemplate.vacant = "{val}";
      OrgChart.templates.myTemplate.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,275,140)" control-node-menu-id="{id}">' +
        '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect>' +
        '<circle cx="0" cy="0" r="2" fill="#ffffff"></circle>' +
        '<circle cx="7" cy="0" r="2" fill="#ffffff"></circle>' +
        '<circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>';
  };

  function createGraph() {
    createTemplate(); // 1

    this.oOrgChart = new OrgChart(document.getElementById('__xmlview1--orgchart'), {
      template: "myTemplate",
      enableDragDrop: true,
      enableSearch: false,
      mouseScrool: OrgChart.action.zoom,
      toolbar: {
        fullScreen: false,
        zoom: true,
        fit: true,
        expandAll: false
      },
      nodeMenu: {
        // details: { text: "Детали" },
        edit: { text: "Изменить" },
        add: { text: "Добавить шт. должность" },
        remove: { text: "Удалить" }
      },
      nodeBinding: {
        field_0: "position",
        field_1: "orgeh",
        field_2: "city",
        field_3: "name",
        field_4: "money",
        field_5: "plansCount",
        img_0: "photo",
        textFieldWhenTheNodeIsMaximized: "groupName",
        
        btn: function (sender, node) {
          if (_.includes(node.tags, "expandable")) {
            return '<g class="btn" transform="matrix(1,0,0,1,135,135)" style="cursor:pointer;">'
              + '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
              + '<line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line>'
              + '<line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#aeaeae"></line></g>'
          }
        },

        vacant: function (sender, node) {
          if (_.includes(node.tags, "vacant")) {
            return '<image class="vacant-icon" xlink:href="img/vacant.png" x="275" y="6" width="20" height="20"></image>';
          }
        },
      },
      tags: {
        "subtrees": {
          template: "group"
        },
      },
      collapse: {
        level: 2,
        allChildren: true
      },
      nodes: [],
    });

    GraphHandlers.setHandlers.call(this);
  };

  return {
    create: createGraph
  }
});