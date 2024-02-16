import { Button } from '@mui/material';
import { DropzoneDialog } from 'material-ui-dropzone';
import { useState } from 'react';
import { useAsyncAction } from '../hooks/useAsyncAction';
import { FileUploadRounded } from '@mui/icons-material';
import { filesService } from '../services/files-service';
import { transactionsService } from '../services/transactions-service';

export function FileUpload() {
  const [open, setOpen] = useState(false);

  const { trigger: uploadFile, loading } = useAsyncAction(
    async (files: File[]) => {
      const fileResponse = await filesService.uploadFile(files[0]);

      await transactionsService.createTransactionFromFile({
        receipt: fileResponse.id,
      });
    },
  );

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        <FileUploadRounded />
        {!loading ? 'Add Receipt' : 'Loading...'}
      </Button>

      <DropzoneDialog
        filesLimit={1}
        acceptedFiles={['image/*']}
        cancelButtonText={'cancel'}
        submitButtonText={'submit'}
        maxFileSize={5000000}
        open={open}
        onClose={() => setOpen(false)}
        onSave={(files) => {
          setOpen(false);
          uploadFile(files);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </>
  );
}
