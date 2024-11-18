function entry(_context) {
    let svc = new SVCStub(_context);
    let { ex, i, _result, results, result } = _context?.env || {};
    while (1) switch (_context.prev = _context.next) {
        case 0:
            ex = 0;
            i = 1;
        case 2:
            if (!(i < 50)) {
                _context.next = 19;
                break;
            }
            console.log(`asdasd${i}`);
            if (!(i % 2 == 0)) {
                _context.next = 10;
                break;
            }
            _context.next = 7;
            return svc.awrap({ ex, i, _result, results, result }, svc.Delay({}));
        // return regeneratorRuntime.awrap(_context.Delay({}));
        case 7:
            _result = _context.sent;
            if (!(_result.code != 200)) {
                _context.next = 10;
                break;
            }
            return _context.abrupt("return");
        case 10:
            _context.next = 12;
            return svc.awrap({ ex, i, _result, results, result }, svc.Spread(1, svc.Delay({}), svc.IotControl({})));
        // return regeneratorRuntime.awrap(_context.Spread(1, _context.Delay({}), _context.IotControl({})));
        case 12:
            results = _context.sent;
            _context.next = 15;
            return svc.awrap({ ex, i, _result, results, result }, svc.Call("", {}));
        // return regeneratorRuntime.awrap(_context.Call("", {}));
        case 15:
            result = _context.sent;
        case 16:
            i++;
            _context.next = 2;
            break;
        case 19:
        case "end":
            return svc.stop();
    }
}