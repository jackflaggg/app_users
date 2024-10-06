
export const TYPES = {
    Application: Symbol.for("Application"),

    LoggerService: Symbol.for("LoggerService"),
    ILogger: Symbol.for("ILogger"),

    UserService: Symbol.for("UserService"),
    UserServiceInterface: Symbol.for("UserServiceInterface"),

    UserController: Symbol.for("UserController"),
    IUserController: Symbol.for("IUserController"),

    IExceptionFilter: Symbol.for("IExceptionFilter"),
    ExceptionFilter: Symbol.for("ExceptionFilter"),

    HTTPError: Symbol.for("HTTPError"),

    IControllerRoute: Symbol.for("IControllerRoute"),
}