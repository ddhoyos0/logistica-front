import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrar'
})
export class FiltrarPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const result = [];
    for(const post of value){
      if(post.tipoEnvio.indexOf(args) > -1){
        result.push(post);
      }
    }
    return result;
  }

}
