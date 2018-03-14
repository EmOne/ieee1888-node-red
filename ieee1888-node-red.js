module.exports = function(RED) {
    function IEEE1888PARSE(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var ieee1888 = require('ieee1888');
            var moment = ieee1888.moment;
            var client = new ieee1888.Client('http://io.sclora.co.th/axis2/services/FIAPStorage');
            
            (async () => {
               try {
		var rs = await client.write(
		[
		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/mode', value: msg.mode, time: moment() },
		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/meter/energy', value: msg.energy, time: moment() },
		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/meter/power_con', value: msg.power_consumption, time: moment() },
		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/meter/voltage', value: msg.voltage, time: moment() },
		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/meter/current', value: msg.current_mA, time: moment() },
		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/meter/power_gen', value: msg.power_generate, time: moment() },

		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/mems/temperature', value: msg.external_temp, time: moment() },
		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/mems/humidity', value: msg.humidity, time: moment() },
		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/mems/pressure', value: msg.pressure, time: moment() },
		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/mems/luminosity', value: msg.lux, time: moment() },

		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/mems/rain/detect', value: msg.rain.detect, time: moment() },
		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/mems/rain/level', value: msg.rain.level, time: moment() },
		
		{ id: 'io.sclora.co.th/' + msg.country + '/' + msg.province + '/'+ msg.site_id + '/panels/' + msg.panel_id + '/error', value: msg.error_code, time: moment() },
		]
		)
		console.log(rs);
		} catch (err) {
                  console.log(err);
                }

                msg.payload = rs;
                node.send(msg);
            })();
        });
    }
    RED.nodes.registerType("ieee1888-node-red",IEEE1888PARSE);
}
