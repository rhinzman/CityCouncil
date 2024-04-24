// app.js

require([
    "esri/config",
     "esri/Map",
     "esri/views/MapView",
     "esri/widgets/BasemapGallery",
     "esri/widgets/Locate",
     "esri/layers/FeatureLayer",   
     "esri/widgets/Legend",
   ], function (esriConfig,Map, MapView, BasemapGallery, Locate, FeatureLayer, Legend) {
   
     esriConfig.apiKey = "AAPKd744f2fda2e347d9a3cf7faf3473cfaczN_o6-pVEC0xDG9THThI-plcBTYdOZQwfAaWLFCk-7w8cNq-B8MvENgmb2NpNTXc";
     const map = new Map({
       basemap: "dark-gray"
     });
   
     const view = new MapView({
         map: map,
         center: [-83.046, 42.34],
         zoom: 11,
         container: "viewDiv"
       });
   
     const basemapGallery = new BasemapGallery({
         view: view
       });
   
     view.ui.add(basemapGallery, {
       position: "bottom-left"
     }); 
   
     const locateBtn = new Locate({
         view: view
       });
   
     view.ui.add(locateBtn, {
       position: "top-left"
     });    
   
     const layer = new FeatureLayer({ 
       url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/survey123_fd556031aae0456ca38a1e575a84e00f_results/FeatureServer",
     });
   
     const cityCouncil = new FeatureLayer({
       url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/CityCouncilDistrict/FeatureServer",
       outFields: ["District_N"],
       popupTemplate: {
         title: "City Council District {District_N}",
         content: "This is City Council District {District_N}",
         labelPlacement: "top-left"
       } 
     });
   
     map.add(cityCouncil);
   
     const colorVis= {
       type: "simple",
       symbol: {
         type: "simple-fill",
         color: "rgba(192, 192, 192, .10)",
         outline: {
           color: "white",
           width: 1,
         }
       }
     };
   
     cityCouncil.renderer = colorVis;
   
     const legend = new Legend({
       view: view,
       layerInfos: [
         {
           layer: cityCouncil,
           title: "City Council Districts"
         },
       ]
     });
   
     view.ui.add(legend, "bottom-right");
    });