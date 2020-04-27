/**
 * Build response status switcher
 * @param {Map} errorStatusesMap - key is error response status, value - handler for this status
 * @return {function(...[*]=)} - function, which can switch response status and call handler for this status
 */
export default function build(errorStatusesMap) {
    return async (response, onSuccess) => {
        if (response.status === 200) {
            let body;
            try {
                body = await response.json();
            } catch (e) {
                // empty response body
            }
            onSuccess?.(body);
            return true;
        } else if (errorStatusesMap.has(response.status)) {
            errorStatusesMap.get(response.status)();
        } else {
            errorStatusesMap.get('default')?.();
            console.log('Бекендер молодец!!!');
        }
        return false;
    };
};
