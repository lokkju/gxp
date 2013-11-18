Ext.QuickTips.init();

var form = new gxp.LayerUploadPanel({
    renderTo: "container",
    url: "/geoserver/rest",
    width: 350,
    frame: true,
    title: "Upload Layer Data",
    autoHeight: true,
    bodyStyle: "padding: 10px 10px 0 10px;",
    labelWidth: 65,
    defaults: {
        anchor: "95%",
        allowBlank: false,
        msgTarget: "side"
    },
    listeners: {
        uploadcomplete: function(panel, detail) {
            console.log(detail)
            var names = [];
            var names = [];
            Ext.each(detail.import.tasks, function(task,taskIdx) {names.push(task.layer.originalName + " saved as " + task.target.dataStore.workspace.name + ":" + task.layer.name);})
            Ext.Msg.show({
                title: "Success",
                msg: "Added new layer" + (names.length !== 1 ? "s" : "") + ": <br/>" + names.join("<br/> "),
                minWidth: 200,
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
        }
    }
});
