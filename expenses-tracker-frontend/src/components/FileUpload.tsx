import { Button } from '@mui/material';
import { useState } from 'react';
import { useAsyncAction } from '../hooks/useAsyncAction';
import { FileUploadRounded } from '@mui/icons-material';
import { filesService } from '../services/files-service';
import { DropzoneDialog } from 'react-mui-dropzone';

interface FileUploadProps {
  onSuccess: (fileId: string) => void;
}

export function FileUpload({ onSuccess }: FileUploadProps) {
  const [open, setOpen] = useState(false);

  const { trigger: uploadFile, loading } = useAsyncAction(
    async (files: File[]) => {
      const fileResponse = await filesService.uploadFile(files[0]);

      onSuccess(fileResponse.id);
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
