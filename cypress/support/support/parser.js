export default class Parser {
    parseMetadata(metadata) {
        let parsed = {};
        metadata.forEach($entry => {
            if ($entry.textValue) {
                parsed[$entry.displayName] = $entry.textValue;
            }
            if ($entry.values) {
                parsed[$entry.displayName] = $entry.values.map($value => $value.displayName).join(', ');
            }
        });
        return parsed;
    };

    parseRate(rate) {
        if (rate.rating < 1) {
            return 'Not rated yet';
        }
        return rate.rating;
    };

    parsePath(path) {
        return path[0]['paths'][0]['path'].map($value => $value.name).join(' > ');
    };
};