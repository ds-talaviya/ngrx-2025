import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../../../loader.service';

export function effectWithLoader<T>(loader: LoaderService): (source$: Observable<T>) => Observable<T> {
    loader.show();
    return (source$: Observable<T>) => source$.pipe(
        finalize(() => {
            loader.hide();
        })
    );
}
