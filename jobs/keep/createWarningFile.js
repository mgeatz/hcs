const fs          = require('fs');
const args        = process.argv;
const mntCapacity = args[2].split(' ')[38]; // TODO: find better way to extract this
const capacity    = mntCapacity.split('%')[0];
const maxCapacity = args[3];
const warningFile = 'warn_' + args[4] + '_' + maxCapacity + '.txt';

try {
	fs.unlink(warningFile, function (err) {
		if (err) {
			console.log('no' + warningFile + 'files found');
			//throw err;
		} else {
			console.log('Old' + warningFile + 'file has been deleted.');
		}
	});
}
catch (e) {
	console.log('error ', e);
}


if (parseInt(capacity) >= maxCapacity) {

	console.log('!!!WARNING!!! Capacity has exceeded maximum (', maxCapacity, '%). Current usage =', mntCapacity);

	fs.writeFile(warningFile, 'WARNING! Tray has capacity exceeded maximum.', function (err) {
		if (err) throw err;
		console.log('New' + warningFile + 'file created for shell script discovery.');
	});

} else {

	console.log('Disk has plenty of space. Current usage =', mntCapacity, '. Maximum threshold =', maxCapacity);

}