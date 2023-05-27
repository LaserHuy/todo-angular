import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map, find } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  

  constructor( private afs: AngularFirestore, private toastr: ToastrService ) { }

  saveTodo(id: string, data: any) {
    this.afs.collection('categories').doc(id).collection('todos').add(data).then((docRef) => {

      this.afs.doc('categories/' + id).update({todoCount: firebase.firestore.FieldValue.increment(1)});
      this.toastr.success('Task added successfully');
    });
  }

  loadTodos(id: string) {

    return this.afs.collection('categories').doc(id).collection('todos').snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, data}
          })
        })
      );
  }

  loadNameCategory(id: string) {
    return this.afs.collection('categories').doc(id).snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data();
        return {data}
      })
    );
  }

  updateTask(id: string, ctgId: string, updatedData: any) {

    this.afs.doc('categories/'+ ctgId + '/todos/' + id).update({todo: updatedData}).then(() => {
      this.toastr.success('Task updated successfully');
    });

  }

  deleteTask(id: string, ctgId: string) {
      
      this.afs.doc('categories/'+ ctgId + '/todos/' + id).delete().then(() => {
        this.afs.doc('categories/' + ctgId).update({todoCount: firebase.firestore.FieldValue.increment(-1)});
        this.toastr.error('Task deleted successfully');
      });
  
  }

  markCompleted(id: string, ctgId: string) {
      
      this.afs.doc('categories/'+ ctgId + '/todos/' + id).update({isCompleted: true}).then(() => {
        this.toastr.info('Task completed successfully');
      });
  
  }

  markUncompleted(id: string, ctgId: string) {
        
        this.afs.doc('categories/'+ ctgId + '/todos/' + id).update({isCompleted: false}).then(() => {
          this.toastr.warning('Task uncompleted');
        });
  }

}
