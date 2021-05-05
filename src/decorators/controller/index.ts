/**
 * Builds the controller
 *
 * @param path
 */
export function Controller(path: string): any {
    return (CurrentController) => {
        const newController = {};
        const controller = new CurrentController();
        controller.path = path;

        Object.getOwnPropertyNames(CurrentController.prototype).forEach(
            (ApiEndpoint) => {
                const controllerParams = ['path', 'constructor', 'handler'];
                if (controllerParams.includes(ApiEndpoint)) return;

                controller[ApiEndpoint] = {
                    handler: controller.handler,
                    path,
                };

                newController[ApiEndpoint] = controller[ApiEndpoint];
            },
        );

        return newController;
    };
}
